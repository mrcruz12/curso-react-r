import React, { useState } from 'react';
import { FaGithub, FaPlus } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

export default () => {
  const [newRepo, setNewRepo] = useState('');
  const handleInputChange = e => {
    setNewRepo(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();

    const response = await api.get(`/users/${newRepo}`);
    const data = {
      name: response.data.full_name,
    };
    console.log(data);
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

        <SubmitButton>
          <FaPlus color="#fff" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
};
