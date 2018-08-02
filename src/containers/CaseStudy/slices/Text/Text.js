import { RichText } from 'prismic-reactjs';

const Text = props => RichText.render(props.data.value);

export default Text;
