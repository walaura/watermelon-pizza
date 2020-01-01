import React from "react";
import Layout, { WrapBlock } from "../layout/layout";
import Stickers from "./../components/stickers/stickers";
import { Heading } from "./../components/type/type";
import Footer from "./../components/footer/footer";
import { Link } from "gatsby";
import LinkList, { ChonkyLink } from "../components/links/links";

export default () => (
  <Layout title="Wander into the past">
    <WrapBlock inverted outside={<Stickers avoidBackground={false} />}>
      <Link to="/">Backsies</Link>
      <Heading>Wander into the past</Heading>
    </WrapBlock>
    <WrapBlock>
      <p>Here's how this site looked in the past! Cool right?</p>
      <LinkList isList>
        <ChonkyLink
          href="/"
          title="dsfsdfdsf"
          subtitle="sdfdsfdsf"
        ></ChonkyLink>
        <ChonkyLink
          href="/"
          title="dsfsdfdsf"
          subtitle="sdfdsfdsf"
        ></ChonkyLink>
        <ChonkyLink
          href="/"
          title="dsfsdfdsf"
          subtitle="sdfdsfdsf"
        ></ChonkyLink>
        <ChonkyLink
          href="/"
          title="dsfsdfdsf"
          subtitle="sdfdsfdsf"
        ></ChonkyLink>
        <ChonkyLink
          href="/"
          title="dsfsdfdsf"
          subtitle="sdfdsfdsf"
        ></ChonkyLink>
      </LinkList>
      <Footer />
    </WrapBlock>
  </Layout>
);
