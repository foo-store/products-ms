import { Provider } from "@nestjs/common";
import { NATS_SERVICE } from "../constants";
import { ClientOptions, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { envs } from "src/config";

export const natsProvider: Provider = {
  provide: NATS_SERVICE,
  useFactory: () => {
    const config: ClientOptions = {
      transport: Transport.NATS,
      options: {
        servers: [envs.natsUrl]
      },
    }
    return ClientProxyFactory.create(config)
  }
}