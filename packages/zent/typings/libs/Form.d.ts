/// <reference types="react" />
/// <reference path="./Input.d.ts" />
/// <reference path="./Select.d.ts" />

declare module 'zent/lib/form' {

  import Input from 'zent/lib/input';
  import Select from 'zent/lib/select';

  namespace Form {
    interface IConnectedFormProps {
      onChange?: (value: any) => void
      onSubmitSuccess?: (result: any) => void
      onSubmitFail?: (error?: any) => void
      scrollToError?: boolean
    }

    interface IZentForm {
      getFormValues: () => any
      getFieldError: (name: string) => any
      setFormDirty: (isDirty: boolean) => any
      setFieldExternalErrors: (error: { key: string, value: string }) => void
      setFieldsValue: (data: any) => any
      resetFieldsValue: (data: any) => void
      initialize: (data: any) => void
      isValid: () => boolean
      isSubmitting: () => boolean
      isValidating: () => boolean
      isFieldDirty: (name: string) => boolean
      isFormAsyncValidated: () => boolean
      validateForm: (forceValidate: boolean, callback: Function, relatedFields: Array<any>) => any
      asyncValidateForm: (resolve: Function, reject: Function) => any
      setFormPristine: (value: boolean) => void
      isFormSubmitFail: () => boolean
      isFormSubmitSuccess: () => boolean
      isFieldTouched: (name: string) => boolean
      isFieldValidating: (name: string) => boolean
      updateFormSubmitStatus: (submitSuccess: boolean) => any
    }

    interface IWrappedComponentProps {
      zentForm: IZentForm
      handleSubmit: (submit: (values: any, zentForm: IZentForm) => any) => any
    }

    function createForm(config?: { formValidations?: any }): (component: React.Component<IWrappedComponentProps | any, any>) => React.Component<IConnectedFormProps, any>

    interface IValidation {
      required?: boolean
      isExisty?: boolean
      matchRegex?: RegExp
      isUndefined?: boolean
      isEmptyString?: boolean
      isEmail?: boolean
      isUrl?: boolean
      isTrue?: boolean
      isFalse?: boolean
      isNumeric?: boolean
      isInt?: boolean
      isFloat?: boolean
      isLength?: boolean
      equals?: any
      equalsField?: string
      maxLength?: number
      minLength?: number
    }

    type TransformInvoke = (value: any, previousValue: any, nextValues: any, previousValues: any) => void

    // 类型覆盖时使用
    interface INativeAttributesBlock {
      onBlur
      onChange
      onFocus
      name
      value
    }

    interface UnknownProps {
      isDirty
      isTouched
      isPristine
      isValid
      isActive
      isAsyncValidated
      error
      errors
      validationError
      validationErrors
      validations
      validateOnChange
      validateOnBlur
      clearErrorOnFocus
      asyncValidation
      normalize
      format
      fields
      relatedFields
      submitFailed
      submitSuccess
    }

    type ReplaceBlockList<SOURCE> = {
      [key in keyof SOURCE]: key extends (keyof INativeAttributesBlock) ? IFieldPropsBase[key] : SOURCE[key]
    } & IFieldPropsBase

    interface IFieldPropsBase {
      ref?: (ref: any) => void
      name: string
      value: any
      normalize?: TransformInvoke
      format?: TransformInvoke
      onChange?: TransformInvoke
      onBlur?: TransformInvoke
      onFocus?: React.FocusEventHandler<any>
      validations?: IValidation
      validationErrors?: any
      validateOnChange?: boolean
      validateOnBlur?: boolean
      asyncValidation?: (values: Object, value: any) => Promise<any>
      displayError?: boolean
      relatedFields?: Array<any>
    }

    interface IFieldProps extends IFieldPropsBase {
      component: string | React.Component<any, any>
    }

    interface IFormSectionProps {
      name: string
      component?: React.ReactNode
    }

    interface IFieldArrayProps {
      name: string
      value?: Array<any>
      component: React.ReactNode
    }

    class Field extends React.Component<IFieldProps, any> { }

    class FormSection extends React.PureComponent<IFormSectionProps, any> { }

    class FieldArray extends React.Component<IFieldArrayProps, any> { }

    interface IContolGroupProps {
      label?: string
      className?: string
      helpDesc?: string
      required?: boolean
    }

    function getControlGroup(component: React.Component<any, any>): React.Component<any, any>

    interface IInputFieldProps extends Partial<UnknownProps>, Input.IProps { }
    interface ISelectFieldProps extends Partial<UnknownProps>, Select.IProps { }

    class InputField extends React.Component<IInputFieldProps, any> { }
    class SelectField extends React.Component<ISelectFieldProps, any> { }

    interface IFormInputFieldProps extends ReplaceBlockList<Input.IProps>, IContolGroupProps { }
    interface IFormSelectFieldProps extends ReplaceBlockList<Select.IProps>, IContolGroupProps { }

    class FormInputField extends React.Component<IFormInputFieldProps, any> { }
    class FormSelectField extends React.Component<IFormSelectFieldProps, any> { }

    interface IProps {
      className?: string
      prefix?: string
      vertical?: boolean
      horizontal?: boolean
      inline?: boolean
      onSubmit?: React.FormEventHandler<HTMLFormElement>
      style?: React.CSSProperties
      disableEnterSubmit?: boolean
    }
  }

  class Form extends React.Component<Form.IProps, any> { }

  export default Form
}
