//styles
import styles from './styles.module.scss'
//components
import { Input, Button } from 'antd'
//images
import map from 'sources/images/map.svg'
import Map from 'components/Map'
import { useStore } from 'stores'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { schema } from 'utils/validation'
//constants
const { TextArea } = Input


const AddingPath: React.FC = () => {
  const onChange = (e: any) => {
    console.log('Change:', e.target.value)
  }

  const { pathsStore } = useStore()

  const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

  return (
    <div className={styles.content}>
      <div className={styles.inputsContainer}>
        <h3 className={styles.inputTitle}>Title</h3>
{/* 
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<InputField
					register={register}
					type='text'
					title='First name'
					name='firstName'
					errMessage={errors.firstName?.message}
					onChange={handlerChange}
				/>
				<InputField
					register={register}
					type='text'
					title='E-mail'
					name='email'
					errMessage={errors.email?.message}
					onChange={() => {}}
				/>
				<InputField
					register={register}
					type='password'
					title='Password'
					name='password'
					errMessage={errors.password?.message}
					onChange={() => {}}
				/>
				<InputField
					register={register}
					type='password'
					title='Password'
					name='passwordConfirmation'
					errMessage={errors.passwordConfirmation?.message}
					onChange={() => {}}
				/>

				<input type='submit' value='Sign up' className={styles.submitButton} />
			</form> */}


        <Input placeholder="Title here" className={styles.inputField} />

        <h3 className={styles.inputTitle}>Short description</h3>
        <TextArea
          showCount
          maxLength={160}
          style={{ height: 100 }}
          className={styles.inputField}
          onChange={onChange}
        />

        <h3 className={styles.inputTitle}>Full description</h3>
        <TextArea rows={7} className={styles.inputField} />

        <div className={styles.lengthContainer}>
          <img src={map} alt="map" className={styles.mapIcon} />
          <div className={styles.text}>Length 1.13 km</div>
        </div>
        <Button className={styles.button}>Add path</Button>
      </div>
      <div className={styles.mapContainer}>
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA9bslaj5Bl5nLuQQXe8rr_PkhDvvZqzMs"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `500px` }} />}
        >
          <button>Add marker</button>
        </Map>
      </div>
    </div>
  )
}

export default AddingPath
