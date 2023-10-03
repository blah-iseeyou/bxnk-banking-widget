import { useState, useContext } from 'react'
import { Modal, Form, Input, InputPassword, Button, Loader, NativeSelect, Row, Col, Typography } from 'tiny-ui';
import axios from 'axios'

import img from '../assets/BXNKLogo.png'
import { URL_WS } from '../Context/Params'

const { Option } = NativeSelect;
const { Text } = Typography;

function ModalLogin(props) {

	let { visible, onCancel, URL, onLogin } = props;

	let [loading, setLoading] = useState(false)
	let [token, setToken] = useState(null)
	let [cuentas, setCuentas] = useState([])

	const onFinish = (values) => {
		setLoading(true)
		axios.post(`${URL}/api/login`,{
			...values
		}).then(response => {
			onLogin(response.data)
			onCancel()
		}).catch(error => {
			console.log(error.response)
		}).finally(()=>setLoading(false))
	}

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
			<Row>
				<Col span={24} style={{display: 'flex', justifyContent: "center", marginBottom: "2.2rem"}}>
					<Text style={{ fontSize: '38px', fontWeight: '600' }}> Iniciar Sesión </Text>
				</Col>
			</Row>
			<Loader loading={loading} style={{width: "100%"}}>
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
		</Modal>
	)
}


export default props => <ModalLogin {...props} URL={useContext(URL_WS)}/>