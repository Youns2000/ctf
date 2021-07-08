import React, { useEffect, useState } from 'react'
import { Tabs, Tab, ListGroup, Row, Col } from "react-bootstrap";
import "./Admin.css";
import { getChallenges } from '../services/api'
import { ReactComponent as Loading } from '../loading.svg';

export default function Admin() {
    const [challenges, setChallenges] = useState([{ title: "", categorie: "", link: "", flags: {} }]);
    const [key, setKey] = useState('challenges');
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function setU() {
            setLoading(true);
            const mapChallenges = await getChallenges();

            if (mapChallenges) {
                Object.keys(mapChallenges).forEach(key => {
                    challenges.push(mapChallenges[key])
                });
            }
            challenges.shift()
            setLoading(false);
        }
        setU()
        return () => {
        }
    }, [challenges]);

    function ShowChallenges() {
        var output = [];
        challenges.forEach(c => {
            output.push(
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        <Col sm={4}>
                            <ListGroup>
                                <ListGroup.Item action href="#link1">
                                    Link 1
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link2">
                                    Link 2
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#link1">
                                    test1
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link2">
                                    test2
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            )
        });
        return (output);
    }


    function ControlledTabs() {

        return (
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="challenges" title="Challenges">
                    {loading ? <Loading /> : <ShowChallenges />}
                </Tab>
                <Tab eventKey="users" title="Users">
                    <p>test2</p>
                </Tab>
            </Tabs>
        );
    }

    return (
        <div>
            <ControlledTabs />
        </div>

    );
}