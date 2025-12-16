type SendMessageConfig = {
  message: string
}

type SendMessageResult = {
  timestamp: string
}

export function sendMessage(_config: SendMessageConfig): SendMessageResult {
  return {
    timestamp: '...',
  }
}
