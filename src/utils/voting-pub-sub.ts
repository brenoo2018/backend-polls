type Message = {
  pollOptionId: string;
  votes: number;
};
type Subscriber = (message: Message) => void;

class VotingPubSub {
  private channels: Record<string, Subscriber[]> = {};

  subscribe(channel: string, subscriber: Subscriber) {
    if (!this.channels[channel]) {
      this.channels[channel] = [];
    }

    this.channels[channel].push(subscriber);
  }

  publish(channel: string, message: Message) {
    if (!this.channels[channel]) {
      return;
    }

    for (const subscriber of this.channels[channel]) {
      subscriber(message);
    }
  }
}

export const votingPubSub = new VotingPubSub();
