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
import "./index.less"

const { Option } = Select;

type FieldType = {
  [key: string]: any;
};
enum FormItemType {
  Text = "Text",
  Selector = "Selector",
  DatePicker = "DatePicker",
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
    <Form className="form-item-box" ref={formRef} form={form} name="formBasic" scrollToFirstError>
      {options?.map((item: any, key: number) => {
        return (
          <Form.Item
            name={item.questionKey}
            label={item.label}
            rules={[
              {
                required: item?.required || false,
                message: "This field is required",
              },
            ]}
            key={key}
          >
            {item.input == FormItemType.Text && (
              <Input
                placeholder={item.placeHolder}
                value={formData.current[item.questionKey]}
                {...item.params}
                onChange={(e) =>
                  handleChange(item.questionKey, e.target?.value)
                }
              />
            )}
            {item.input == FormItemType.Selector && (
              <Select
                placeholder={item.placeHolder}
                value={formData.current[item.questionKey]}
                mode={item?.params?.multiple ? "multiple" : "default"}
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
            {item.input == FormItemType.DatePicker && (
              <DatePicker
                placeholder={item.placeHolder}
                value={formData.current[item.questionKey]}
                {...item.params}
                onChange={(date: any, dateString: string) =>
                  handleChange(item.questionKey, dateString)
                }
              />
            )}
            {item.input == FormItemType.TextArea && (
              <Input.TextArea
                placeholder={item.placeHolder}
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
