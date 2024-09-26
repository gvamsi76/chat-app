import React, { useContext } from 'react'
import { ChartContext } from '../../context/ChartContex';
import { Container, Stack } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContex';
import MainUserCharts from '../chart/MainUserCharts';
import PotentialCharts from '../chart/PotentialCharts';
import ChatBox from '../chart/ChatBox';

function Chart() {
    const { userCharts, chartError, chartLoading, updateChat } = useContext(ChartContext);
    const { user } = useContext(AuthContext);

    return (
        <>
            <Container>
                <PotentialCharts />
                {userCharts && userCharts?.length < 1 ? null : <>

                    <Stack direction="horizontal" gap={4} className='align-items-start'>
                        <Stack className='messages-box flex-grow-0 pe-3' gap={3}>
                            {chartLoading && <p>Loading the Charts </p>}
                            {userCharts && userCharts?.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => updateChat(item)}>
                                        <MainUserCharts chat={item} user={user} />
                                    </div>
                                )
                            })}
                        </Stack>
                        <ChatBox />

                    </Stack>
                </>}
            </Container>
        </>
    )
}

export default Chart