import { type GetServerSideProps } from 'next';
import Pocketbase, { type Record } from 'pocketbase';

const pocketbase = new Pocketbase('http://127.0.0.1:8090');

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  try {
    if (typeof id === 'string') {
      const instance = await pocketbase
        .collection('sharedImages')
        .getOne<{ image: string } & Record>(id);
      const url = pocketbase.getFileUrl(instance, instance.image, {});

      return {
        redirect: {
          permanent: true,
          destination: url,
        },
      };
    } else {
      return {
        redirect: {
          permanent: true,
          destination: '/',
        },
      };
    }
  } catch (e) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    };
  }
};
export default function Nothing() {
  return null;
}
