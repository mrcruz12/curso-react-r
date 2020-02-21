import React, { useState } from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

export default () => {
  const [newRepo, setNewRepo] = useState('');
  const [repository, setRepository] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = e => {
    setNewRepo(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name,
    };
    setRepository([...repository, data]);
    setNewRepo('');
    setLoading(false);

    console.log(repository);
  };

  return (
    <Container>
      <h1>
        <FaGithub />
        Repositórios
      </h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newRepo}
          placeholder="Adicionar repositório"
          onChange={handleInputChange}
        />

        <SubmitButton loading={loading}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>
    </Container>
  );
};
