import {useContext, useEffect} from 'react'
import {AuthContext} from '../contexts/AuthContext'
import { api } from "../services/apiClient";

import { withSSRAuth } from '../utils/withSSRAuth'
import { setupAPIClient } from '../services/api';


export default function Dashboard() {
    const { user } = useContext(AuthContext)

    useEffect(() => {
        api.get('/me')
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }, [])

    return (
        <h1>{user?.email}</h1>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  return {
    props: {}
  }
})