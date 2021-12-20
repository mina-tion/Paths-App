import React, { useState, FC } from 'react'
//styles
import styles from './styles.module.scss'

//components
import { Form, Input, Button } from 'antd'
import map from 'sources/images/map.svg'
import { IPath } from 'types/User'

//constants
import { validateMessages } from 'utils/formValidation'
const { TextArea } = Input
type LayoutType = Parameters<typeof Form>[0]['layout']

interface Props {
  tempPathData: IPath
  closeAdding: Function
  addPath: Function
}

const formLabelStyles: any = { span: 14 }
const formWrapperStyles: any = { span: 14 }
const buttonWrapperStyles: any = { span: 14 }

const FormLayout: FC<Props> = ({ closeAdding, tempPathData, addPath }) => {
  const [addingError, setAddingError] = useState('')
  const [form] = Form.useForm()
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical')
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout)
  }

  const onFinish = (data: any) => {
    if (tempPathData.markers.length < 2) setAddingError('Path should contain 2 points and more')
    else {
      addPath(data.path)
      closeAdding()
    }
  }

  return (
    <Form
      labelCol={formLayout === 'horizontal' ? formLabelStyles : null}
      wrapperCol={formLayout === 'horizontal' ? formWrapperStyles : null}
      layout={formLayout}
      form={form}
      onFinish={onFinish}
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
      validateMessages={validateMessages}
      className={styles.form}
    >
      <Form.Item
        name={['path', 'title']}
        label="Title"
        rules={[{ required: true }]}
        className={styles.inputField}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['path', 'shortDescription']}
        label="Short description"
        rules={[{ required: true }]}
        className={styles.inputField}
      >
        <TextArea showCount maxLength={160} style={{ height: 100 }} />
      </Form.Item>
      <Form.Item
        name={['path', 'fullDescription']}
        label="Full Description"
        rules={[{ required: true }]}
        className={styles.inputField}
      >
        <TextArea rows={7} />
      </Form.Item>
      <div className={styles.lengthContainer}>
        <img src={map} alt="map" className={styles.mapIcon} />{' '}
        <div className={styles.text}>Length {tempPathData.distance} km</div>
      </div>

      <Form.Item wrapperCol={formLayout === 'horizontal' ? buttonWrapperStyles : null}>
        <Button type="primary" htmlType="submit" className={styles.button}>
          Add path
        </Button>
      </Form.Item>

      {addingError && <p className={styles.error}>{addingError}</p>}
    </Form>
  )
}

export default FormLayout
