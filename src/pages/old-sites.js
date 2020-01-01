import React from "react";
import Layout, { WrapBlock } from "../layout/layout";
import Stickers from "./../components/stickers/stickers";
import { Heading } from "./../components/type/type";
import Footer from "./../components/footer/footer";

export default () => (
  <Layout title="Wander into the past">
    <WrapBlock inverted outside={<Stickers avoidBackground={false} />}>
      <Heading>Wander into the past</Heading>
    </WrapBlock>
    <WrapBlock>
      Here's how this site looked in the past! Cool right? <Footer />
    </WrapBlock>
  </Layout>
);
