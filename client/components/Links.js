import React, {Component} from 'react';
// import { getLinkPreview, getPreviewFromContent } from "link-preview-js";


class Links extends Component {
  constructor(props) {
    super(props);
  }

  // previewLink = () => {
  //   getLinkPreview("/")
  //   .then((data) => console.log(data))
  // }

  render() {
    // console.log(this.props.value)
    return (
      <div>
        {/* <p>{this.props.value}</p> */}
          <p>{this.props.hex}</p>
      </div>
    )
  }
}

  export default Links;