import React, { useContext, memo } from "react";
import { ApiDataCtx } from "containers/App/App";
import uuidv1 from "uuid/v1";
import Text from "./slices/Text/Text";
import Columns from "./slices/Columns/Columns";
import Instagram from "./slices/Instagram/Instagram";
import Clients from "./slices/Clients/ClientsWrapper";
import Conclusion from "./slices/Conclusion/Conclusion";
import Gridwall from "./slices/Gridwall/Gridwall";
import Timeline from "./slices/Timeline/Timeline";
import "./About.scss";
import Styled from "./Styled";

function About() {
  const { about } = useContext(ApiDataCtx);

  return (
    <Styled.Wrapper className="view__child">
      {about.content
        .map(slice => {
          switch (slice.slice_type) {
            case "text":
              return <Text data={slice} />;
            case "columns":
              return <Columns data={slice} />;
            case "instagram":
              return <Instagram data={slice} />;
            case "gridwall-v2":
              return <Gridwall data={slice} />;
            case "conclusion":
              return <Conclusion data={slice} />;
            case "clients":
              return <Clients.Wrapper data={slice} />;
            case "color-start":
              return null; // used to be <ScrollTrigger />;
            case "link_to_timeline":
              return <Timeline prismicCtx={this.props.prismicCtx} />;
            default:
              return <p className="future">{slice.slice_type} goes here</p>;
          }
        })
        .map(slice => (
          <div className="about__block" key={uuidv1()}>
            {slice}
          </div>
        ))}
    </Styled.Wrapper>
  );
}

export default memo(About);
