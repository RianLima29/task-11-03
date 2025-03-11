import { server } from './api/server';
import { log } from './common/helpers/log';
import { runKafkaConsumer } from './llm/kafka';

runKafkaConsumer().catch(console.log);

server.listen(process.env.HTTP_SERVER_PORT as string, () => {
  log({
    msg: `HTTP server running on port ${process.env.HTTP_SERVER_PORT}`,
    prefix: 'HTTP_SERVER',
  });
});
