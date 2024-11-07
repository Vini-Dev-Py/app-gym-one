import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
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

export const ProfessionalDashboard = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:8080/announcement', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Erro ao buscar anúncios:', error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleCreateAnnouncement = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const authorId = user.id;

    try {
      setLoading(true);
      await axios.post('http://localhost:8080/announcement', { title, content, authorId }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setLoading(false);
      setShowModal(false);
      setTitle('');
      setContent('');
      fetchAnnouncements();
    } catch (error) {
      setLoading(false);
      console.error('Erro ao criar anúncio:', error);
    }
  };

  const authorTemplate = (rowData: Announcement) => (
    <span>{rowData.author.username} ({rowData.author.email})</span>
  );

  const dateTemplate = (rowData: Announcement) => (
    <span>{new Date(rowData.createdAt).toLocaleDateString()}</span>
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Anúncios</h1>
        <Button
          label="Criar Anúncio"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={() => setShowModal(true)}
        />
      </div>

      <DataTable value={announcements} paginator rows={5} className="shadow-lg" stripedRows removableSort>
        <Column field="title" header="Título" sortable />
        <Column field="content" header="Conteúdo" sortable />
        <Column header="Autor" body={authorTemplate} />
        <Column header="Data de Criação" body={dateTemplate} />
      </DataTable>

      <Dialog
        header="Criar Anúncio"
        visible={showModal}
        onHide={() => setShowModal(false)}
        style={{ width: '650px' }}
        footer={
          <div>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text mr-6" onClick={() => setShowModal(false)} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-success" onClick={handleCreateAnnouncement} loading={loading} />
          </div>
        }
      >
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Título</label>
          <InputText
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Conteúdo</label>
          <InputTextarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite o conteúdo do anúncio"
            rows={5}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Dialog>
    </div>
  );
};
