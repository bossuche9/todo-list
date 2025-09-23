import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 0.5rem;
  font-weight: bold;
`;

const StyledLabel = styled.label`
  padding: 0.5rem;
`;

function TextTnputWithLabel({ elementId, label, onChange, ref, value }) {
  return (
    <>
      <StyledLabel htmlFor={elementId}>{label}</StyledLabel>
      <StyledInput
        type="text"
        id={elementId}
        ref={ref}
        onChange={onChange}
        value={value}
      />
    </>
  );
}

export default TextTnputWithLabel;
