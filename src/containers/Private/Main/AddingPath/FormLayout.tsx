import { useState } from 'react'
//styles
import styles from './styles.module.scss'

//components
import { Form, Input, Button } from 'antd'
import map from 'sources/images/map.svg'
import { useStore } from 'stores'

//constants
const { TextArea } = Input
type LayoutType = Parameters<typeof Form>[0]['layout']

interface Props {
  close: () => void
}

const FormLayout: React.FC<Props> = ({ close }) => {
  const { pathsStore } = useStore()
  const [form] = Form.useForm()
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical')
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout)
  }
  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 14 },
          wrapperCol: { span: 4 },
        }
      : null

  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: { span: 4, offset: 14 },
        }
      : null

  const validateMessages = {
    required: '${label} is required!',
    types: {
      string: '${label} is not a valid string!',
    },
  }

  const onFinish = (values: any) => {
    pathsStore.addPath(values)
    close()
  }

  return (
    <Form
      {...formItemLayout}
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
        <div className={styles.text}>Length 1.13 km</div>
      </div>

      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit" className={styles.button}>
          Add path
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormLayout
