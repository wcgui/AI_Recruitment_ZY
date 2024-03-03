import React, {
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  DatePicker,
} from "antd";

const { Option } = Select;

type FieldType = {
  [key: string]: any;
};
enum FormItemType {
  Text = "Text",
  Selector = "Selector",
  DataPicker = "DataPicker",
  TextArea = "TextArea",
}
const App: React.FC<{
  options: Array<any>;
  onChange?: Function; //值发生变化回调
  formData?: any; //当前表单绑定的值
  [key: string]: any;
}> = (prop, ref) => {
  const { options = [] } = prop;
  const [form] = Form.useForm();
  const formRef = useRef();
  const formData = useRef<FieldType>({});
  const handleChange = (name: any, value: any) => {
    formData.current = {
      ...formData.current,
      [name]: value,
    };
    prop.onChange && prop.onChange(formData.current);
  };

  useEffect(() => {
    formData.current = prop.formData || {};
  }, [prop.formData]);
  useImperativeHandle(ref, () => ({
    formRef() {
      return formRef.current;
    },
  }));
  return (
    <Form ref={formRef} form={form} name="formBasic" scrollToFirstError>
      {options?.map((item: any, key: number) => {
        return (
          <Form.Item
            name={item.questionKey}
            label={item.label}
            rules={[
              {
                required: true || item?.params?.required || false,
                message: "This field is required",
              },
            ]}
            key={key}
          >
            {item.input == FormItemType.Text && (
              <Input
                placeholder="placeholder"
                value={formData.current[item.questionKey]}
                {...item.params}
                onChange={(e) =>
                  handleChange(item.questionKey, e.target?.value)
                }
              />
            )}
            {item.input == FormItemType.Selector && (
              <Select
                placeholder="placeholder"
                value={formData.current[item.questionKey]}
                {...item.params}
                onChange={(e) => handleChange(item.questionKey, e)}
              >
                {item?.params?.options?.map((option: any) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            )}
            {item.input == FormItemType.DataPicker && (
              <DatePicker
                placeholder="placeholder"
                value={formData.current[item.questionKey]}
                {...item.params}
                onChange={(date: any, dateString: string) =>
                  handleChange(item.questionKey, dateString)
                }
              />
            )}
            {item.input == FormItemType.TextArea && (
              <Input.TextArea
                placeholder="placeholder"
                showCount
                value={formData.current[item.questionKey]}
                {...item.params}
                onChange={(e) =>
                  handleChange(item.questionKey, e.target?.value)
                }
              />
            )}
          </Form.Item>
        );
      })}
    </Form>
  );
};

export default forwardRef(App);
