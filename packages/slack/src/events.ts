import type { EventMap } from '@triggerskit/core'
import type {
  AppMentionEvent,
  MemberJoinedChannelEvent,
  MessageEvent,
  ReactionAddedEvent,
  ReactionRemovedEvent,
} from './schemas'

export interface SlackEvents extends EventMap {
  message: MessageEvent
  app_mention: AppMentionEvent
  reaction_added: ReactionAddedEvent
  reaction_removed: ReactionRemovedEvent
  member_joined_channel: MemberJoinedChannelEvent
  '*': { type: string; [key: string]: unknown }
}
