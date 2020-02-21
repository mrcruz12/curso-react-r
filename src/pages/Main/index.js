import React, { useState, useEffect } from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Form, SubmitButton, List } from './styles';
import Container from '../../container/styles';

export default () => {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = e => {
    setNewRepo(e.target.value);
  };

  const setLocalStorage = repositoriesLocal => {
    localStorage.setItem('repositories', JSON.stringify(repositoriesLocal));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name,
    };
    setRepositories([...repositories, data]);
    setLocalStorage([...repositories, data]);
    setNewRepo('');
    setLoading(false);
  };

  useEffect(() => {
    const repos = JSON.parse(localStorage.getItem('repositories'));
    setRepositories(repos);
  }, []);

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
      <List>
        {repositories.map(repository => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
};
