import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import img0 from '../../images/img0.jpg'
import img1 from '../../images/img1.jpg'
import img2 from '../../images/img2.jpg'
import img3 from '../../images/img3.jpg'
import './gameStyles.css';
import { RootState } from '../../redux/reducers/rootreducer'
import { modifyBalanceAction } from '../../redux/actions/balanceActions';
import { Istate as DataProp } from './Content';

interface GameProps {
    startGame: boolean,
    setStartGame: React.Dispatch<React.SetStateAction<boolean>>,
    setDatas: React.Dispatch<React.SetStateAction<DataProp['datas']>>,
    datas: DataProp['datas'],
}

const Game: React.FC<GameProps> = ({ startGame, setStartGame, setDatas, datas }) => {

    const [slot, setSlot] = useState<[number, number, number]>([1, 1, 1]);
    const [openModal, setOpenModal] = useState(startGame);
    const dispatch = useDispatch();
    const balance = useSelector((state:RootState) => state.currentBalance);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleCloseModal = (): void => {
        setOpenModal(false);
        setStartGame(false);
    };

    const displayImg = (id: number) => {
        if(id === 0){
            return img0;
        }else if(id === 1){
            return img1;
        }else if(id === 2){
            return img2;
        }else{
            return img3;
        }
    }

    const handleSpin = () => {
        if(balance <2){
            handleCloseModal();
            return;
        }
        let cost = -2;
        let temp: [number, number, number]= [-1,-1,-1];
        for(let i=0; i<3; i++){
            let res = Math.floor( Math.random()* (3 - 0 +1) + 0 );
            temp[i] = res;
        }
        setSlot(temp);
        let set = new Set(temp);
        if(set.size === 2){
            cost += 0.5;
        }else if(set.size === 1 && set.has(0)){
            cost += 5;
        }else if(set.size ===1) {
            cost += 2;
        }
        console.log('cost ', cost);
        dispatch(modifyBalanceAction(cost));
        setDatas([...datas, {id: datas.length+1, slot: [...temp], time: `${new Date().getHours()} : ${new Date().getMinutes()}: ${new Date().getSeconds()}` }])

        
        
    }

    const handleReset = () => {
        setSlot([0,0,0])
    }
    return <Dialog
        sx={{ padding: '2rem' }}
        fullScreen={fullScreen}
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="responsive-dialog-title"
    >
        <DialogTitle id="responsive-dialog-title">
            { balance > 2 ? 'Start Game': 'Low Balance !! Game Over'}
        </DialogTitle>
        <DialogContent style={{ paddingTop: '1rem' }}>
            <DialogContentText>
                {/* error = {inputFields.email ==='' && !isValid && submitStatus === 'SUBMITTED'} helperText = {submitStatus === 'SUBMITTED' && errors?.email} */}
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Button disabled={ balance < 2 } onClick={handleSpin} size='large' color='success' variant="outlined">Spin&nbsp;</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button onClick={handleReset} size='large' color='secondary' variant="outlined">Reset</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button onClick={handleCloseModal} size='large' color='error' variant="outlined">Close</Button>
                        </Grid>
                    </Grid>
                </div>
                <div style={{ marginTop: '2rem' }} className='container'>
                    <div className="box-1">
                        <img alt='test' height='30.5rem'  src={displayImg(slot[0])} />
                    </div>
                    <div className="box-2">
                        <img alt='test' height='30.5rem' src={displayImg(slot[1])} />
                    </div>
                    <div className="box-3">
                        <img alt='test' height='30.5rem' src={displayImg(slot[2])} />
                    </div>
                </div>

            </DialogContentText>
        </DialogContent>
    </Dialog>
}

export default Game;
