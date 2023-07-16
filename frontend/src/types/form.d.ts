declare namespace JSX {
  interface ExtendedForm
      extends React.DetailedHTMLProps<
          React.FormHTMLAttributes<HTMLFormElement>,
          HTMLFormElement
      > {
      netlify?: boolean;
  }

  interface IntrinsicElements {
      form: ExtendedForm;
  }
}