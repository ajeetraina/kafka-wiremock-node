const { Kafka } = require('kafkajs');
const axios = require('axios');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const run = async () => {
  // Connect the producer
  await producer.connect();
  
  // Send a message to Kafka
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello Kafka' },
    ],
  });

  // Make a request to the mocked API
  try {
    const response = await axios.get('http://localhost:8080/api/data');
    console.log('Response from Wiremock:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  // Disconnect the producer
  await producer.disconnect();
};

run().catch(console.error);
