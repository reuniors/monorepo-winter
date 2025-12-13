function useDefaultProps(props, defaultProps) {
  return {
    ...defaultProps,
    ...props
  };
}
export {
  useDefaultProps as u
};
