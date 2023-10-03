import { useState, useContext } from 'react'
import { Modal, Form, Input, InputPassword, Button, Loader, NativeSelect, Row, Col } from 'tiny-ui';
import axios from 'axios'

import img from '../assets/BXNKLogo.png'
import { URL_WS } from '../Context/Params'

const { Option } = NativeSelect;

function ModalLogin(props) {

	let { visible, onCancel, URL } = props;

	let [loading, setLoading] = useState(false)
	let [token, setToken] = useState(null)
	let [cuentas, setCuentas] = useState([])

	const onFinish = (values) => {
		setLoading(true)
		axios.post(`${URL}/api/login`,{
			...values
		}).then(response => {
			console.log(response.data)
			setCuentas(response.data.cuentas)
		}).catch(error => {
			console.log(error.response)
		}).finally(()=>setLoading(false))
	}

	return (
		<Modal
			header="Iniciar Sesión BXNK"
			visible={visible}
			onOk={() => {}}
			onCancel={() => onCancel()}
			footer={null}
		>
			<Row>
				<Col span={24} style={{display: 'flex', justifyContent: "center", margin: "2.2rem"}}>
					<img src={img} style={{ height: 40 }} />
				</Col>
			</Row>
			<Loader loading={loading} style={{width: "100%"}}>
				<Form
					layout="vertical"
	  				onFinish={(values) => onFinish(values)}
	  				//onFinishFailed={({values, errors}) => console.log(values, errors)}
	  				initialValues={{ email: '', password: ''}} 
	  			>  
					<Form.Item
						label="Correo electrónico"
						name="email"
						rules={[{ required: true, message: 'Por favor ingrese el correo' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Contraseña"
						name="password"
						rules={[{ required: true, message: 'Por favor ingrese la contraseña' }]}
					>
						<InputPassword />
	  				</Form.Item>
	  				{cuentas.length > 0 ? <Form.Item
						label="Cuenta"
						name="cuenta_id"
						rules={[{ required: true, message: 'Por favor seleccione una cuenta' }]}
					>
						<NativeSelect
							style={{width: "100%"}}
						>
							{cuentas.map(e => <Option value={e._id}>{e.nombre} <small>{e.cuenta}</small></Option>)}
						</NativeSelect>
	  				</Form.Item> : null}
	    			<Form.Item>
	    				<Button btnType="primary" type="submit" block>Aceptar</Button>
	    			</Form.Item>
				</Form>
			</Loader>
		</Modal>
	)
}


export default props => <ModalLogin {...props} URL={useContext(URL_WS)}/>