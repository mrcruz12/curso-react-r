import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Loading, Owner, IssueList } from './styles';
import Container from '../../container/styles';

export default ({ match }) => {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState({});
  const [loading, setLoading] = useState(true);

  const propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  const fetchRepository = async repo => {
    const [repositoryGit, issuesGit] = await Promise.all([
      api.get(`/repos/${repo}`),
      api.get(`/repos/${repo}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);
    setRepository(repositoryGit.data);
    setIssues(issuesGit.data);
    setLoading(false);
  };
  useEffect(async () => {
    fetchRepository(decodeURIComponent(match.params.repository));
  }, []);

  return loading ? (
    <Loading>Carregando</Loading>
  ) : (
    <Container>
      <Owner>
        <Link to="/">Inicio</Link>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>
      <IssueList>
        {issues.map(issue => {
          return (
            <li>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url} target="_blank">
                    {issue.title}
                  </a>
                  {issue.labels.map(label => {
                    return <span key={label.id}>{label.name}</span>;
                  })}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          );
        })}
      </IssueList>
    </Container>
  );
};
