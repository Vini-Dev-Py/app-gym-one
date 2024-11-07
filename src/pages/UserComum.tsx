import { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import "primereact/resources/themes/lara-light-cyan/theme.css";

type Announcement = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: {
    id: string;
    username: string;
    email: string;
  };
  createdAt: Date;
};

export const UserComum = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:8080/announcement', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAnnouncements(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar anúncios:', error);
      setLoading(false);
    }
  };

  const openDialog = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDialogVisible(true);
  };

  const closeDialog = () => {
    setSelectedAnnouncement(null);
    setIsDialogVisible(false);
  };

  const handleHire = async (announcementId: string) => {
    try {
      // Coloque a chamada à API de contratação aqui
      console.log(`Contratar serviço do anúncio: ${announcementId}`);
      // Exemplo:
      // await axios.post(`http://localhost:8080/hire/${announcementId}`, {}, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      alert('Contratação realizada com sucesso!');
    } catch (error) {
      console.error('Erro ao contratar:', error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Anúncios</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : announcements.length > 0 ? (
        announcements.map((announcement) => (
          <div key={announcement.id} className="mb-4 p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold">{announcement.title}</h2>
            <p className="text-gray-700 mt-2">{announcement.content}</p>
            <p className="text-gray-600 mt-2">Autor: {announcement.author.username}</p>
            <p className="text-gray-600 mt-1">
              Data de criação: {new Date(announcement.createdAt).toLocaleDateString('pt-BR')}
            </p>
            <Button
              label="Ver mais"
              icon="pi pi-eye"
              className="p-button-link mt-2 text-blue-500"
              onClick={() => openDialog(announcement)}
            />
          </div>
        ))
      ) : (
        <p>Nenhum anúncio encontrado.</p>
      )}

      <Dialog
        header={selectedAnnouncement?.title}
        visible={isDialogVisible}
        style={{ width: '50vw' }}
        onHide={closeDialog}
      >
        {selectedAnnouncement && (
          <div>
            <div className="mb-4">
              <p><strong>Conteúdo:</strong> {selectedAnnouncement.content}</p>
              <p><strong>Autor:</strong> {selectedAnnouncement.author.username}</p>
              <p><strong>Contato:</strong> {selectedAnnouncement.author.email}</p>
              <p><strong>Data de criação:</strong> {new Date(selectedAnnouncement.createdAt).toLocaleDateString('pt-BR')}</p>
            </div>
            <Button
              label="Contratar"
              icon="pi pi-check"
              className="p-button-success"
              onClick={() => handleHire(selectedAnnouncement.id)}
            />
          </div>
        )}
      </Dialog>
    </div>
  );
};
