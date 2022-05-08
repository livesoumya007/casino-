import { Button, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react';
import ContentTable from './ContentTable';
import Game from './Game';

export interface Istate{
    datas: {
      id: number
      slot: [number, number, number]
      time: string
    }[]
}

export default function Content() {
  const [datas, setDatas] = useState<Istate['datas']>([]);
  const [startGame, setStartGame] = useState(false);
  return (
    <main>
        <section>
            <Grid sx={{ marginTop: '0.5rem' }} container spacing={2}>
                <Grid xs={5} item></Grid>
                <Grid xs={5} item>
                    <Typography color='blue' variant="h4" gutterBottom component="div">Dashboard</Typography>
                </Grid>
                <Grid xs={2} item>
                    <Button onClick={() => setStartGame(true)} sx={{backgroundColor: 'green'}} variant="contained">Start Game</Button>
                </Grid>
            </Grid>
        </section>
        <section style={{margin: '1rem auto', backgroundColor: 'yellow', maxWidth: '58%', height: '80%' }}>
            <Paper>
                <ContentTable datas={datas} />
            </Paper>
        </section>
        {
            startGame && <Game startGame={startGame} setStartGame={setStartGame} datas={datas} setDatas={setDatas}/>
        }
        

    </main>
  )
}
