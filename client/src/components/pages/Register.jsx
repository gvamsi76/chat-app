import { useContext } from 'react'
import { Alert, Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { AuthContext } from '../../context/AuthContex'

function Register() {
    const { registerInfo, updateRegisterInfo, registerUser, registerError, registerLoading } = useContext(AuthContext);
    return (
        <div>
            <Form onSubmit={registerUser}>
                <Row style={{
                    height: "100vh",
                    justifyContent: "center",
                    paddingTop: "10px"
                }}>
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2> Register </h2>
                            <Form.Control type='text' placeholder='Name'
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })}
                            />
                            <Form.Control type='email' placeholder='Email'
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
                            />
                            <Form.Control type='password' placeholder='password'
                                onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
                            />
                            <Button variant='primary' type='submit'>{registerLoading ? "Creating your account" : "Register"}</Button>
                            {registerError?.error && (

                                <Alert variant='danger' >
                                    <p>{registerError?.massage}</p>
                                </Alert>
                            )}
                        </Stack>

                    </Col>

                </Row>
            </Form>
        </div>
    )
}

export default Register