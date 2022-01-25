import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import nookies from "nookies";
import { Layout } from "../../../components/layout/layout";
import { requireAuthentication } from "../../../hoc/require-authentication.hoc";
import { UserReservationsHOC } from "../../../hoc/user-reservations.hoc";
import { BookingsPage } from "../../../models/bookings.model";
import axios from "../../../utils/axios.util";

interface Props {
  bookingsPENDING: BookingsPage;
}
const clientbookings: NextPage<Props> = ({ bookingsPENDING }) => {
  return (
    <Layout>
      <Head>
        <title>Your bookings </title>
      </Head>
      <UserReservationsHOC bookingsPENDING={bookingsPENDING} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (context) => {
    try {
      const pending = await axios.get(
        `/bookings/clients?pageNumber=1&limit=9&status=PENDING`
      );
      const data = await pending.data;
      return {
        props: {
          bookingsPENDING: data,
        },
      };
    } catch (err) {
      return {
        props: {},
      };
    }
  }
);

export default clientbookings;
