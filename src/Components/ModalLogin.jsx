import { useState, useContext, useEffect } from 'react'
import { Modal, Form, Input, InputPassword, Button, Loader, NativeSelect, Row, Col, Typography, Message } from 'tiny-ui';
import axios from 'axios'

import img from '../assets/BXNKLogo.png'
import { URL_WS } from '../Context/Params'

const { Option } = NativeSelect;
const { Text } = Typography;

function ModalLogin(props) {

	let { visible, onCancel, URL, onLogin, loading, qrcode, auth_2FA } = props;

	let [load, setLoading] = useState(false)
	let [token, setToken] = useState(null)
	let [cuentas, setCuentas] = useState([])

	const onFinish = (values) => {
		onLogin(values)
		/*axios.post(`${URL}/api/login`,{
			...values
		}).then(response => {
			onLogin(response.data)
			onCancel()
		}).catch(error => {
			console.log(error)
			Message.error('Error al iniciar sesión');
		})*/
	}

	useEffect(() => {
		setLoading(loading)
  	},[loading])

	return (
		<Modal
			visible={visible}
			onOk={() => {}}
			onCancel={() => onCancel()}
			footer={null}
		>
			<Row>
				<Col span={24} style={{display: 'flex', justifyContent: "center", marginTop: "2.2rem"}}>
					<img src={img} style={{ width: 164 }} />
				</Col>
			</Row>
			{auth_2FA ? <Loader loading={load} style={{width: "100%"}}>		
					<Row align="center">
	                    <Col xs={22} lg={20} className="center ">
	                        {qrcode ? <p align="justify">
	                            Para mejorar la seguridad de tu cuenta, es necesario instalar una aplicación como Google Authenticator.
	                            Esta app generará códigos únicos que deberás introducir cada vez que inicies sesión.
	                            Para configurarla, solo necesitarás escanear el código QR que aparece a continucación con la cámara de tu teléfono.
	                            De esta manera, podrás proteger tus datos personales y evitar accesos no autorizados a tu cuenta.
	                        </p> : <p align="justify">
	                            Por favor, ingresa el código generado por Google Authenticator en el siguiente para continuar
	                        </p>}
	                    </Col>
	                    <Col xs={22} lg={20} className="center ">
	                        {qrcode ? <img src={qrcode} /> : null}
	                    </Col>
	                    <Col xs={22} lg={20} className="mt-2">

	                    	<Form
								layout="vertical"
				  				onFinish={(values) => onFinish(values)}
				  			>  
								<Form.Item
									name="token"
									rules={[{ required: true, message: 'Por favor, Ingrese el token' }]}
								>
									<Input placeholder="Código" />
								</Form.Item>
				    			<Form.Item>
				    				<Button btnType="primary" type="submit" block>Aceptar</Button>
				    			</Form.Item>
							</Form>
	                    </Col>
	                </Row>
	            </Loader> : <> 
				<Row>
					<Col span={24} style={{display: 'flex', justifyContent: "center", marginBottom: "2.2rem"}}>
						<Text style={{ fontSize: '38px', fontWeight: '600' }}> Iniciar Sesión </Text>
					</Col>
				</Row>
				<Loader loading={load} style={{width: "100%"}}>
					<Row justify="center">
						<Col span={20}>
							<Form
								layout="vertical"
				  				onFinish={(values) => onFinish(values)}
				  				//onFinishFailed={({values, errors}) => console.log(values, errors)}
				  				initialValues={{ email: '', password: ''}} 
				  			>  
								<Form.Item
									name="email"
									rules={[{ required: true, message: 'Por favor ingrese el correo' }]}
								>
									<Input placeholder="Correo Electrónico" />
								</Form.Item>
								<Form.Item
									name="password"
									rules={[{ required: true, message: 'Por favor ingrese la contraseña' }]}
								>
									<InputPassword placeholder="Contraseña"/>
				  				</Form.Item>
				    			<Form.Item>
				    				<Button btnType="primary" type="submit" block>Aceptar</Button>
				    			</Form.Item>
							</Form>
						</Col>
					</Row>
				</Loader>
			</>}
		</Modal>
	)
}


export default props => <ModalLogin {...props} URL={useContext(URL_WS)}/>