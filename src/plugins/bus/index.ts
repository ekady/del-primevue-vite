import mitt from 'mitt';

const bus = mitt<TBusEvent>();

export default bus;
