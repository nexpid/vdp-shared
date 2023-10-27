import { React, stylesheet } from "@vendetta/metro/common";
import { findByProps, findByStoreName } from "@vendetta/metro";
import { General } from "@vendetta/ui/components";

const { showUserProfile } = findByProps("showUserProfile");
const { fetchProfile } = findByProps("fetchProfile");

const UserStore = findByStoreName("UserStore");

const { Text } = General;
const { TextStyleSheet } = findByProps("TextStyleSheet");

export default function SmartMention({
  userId,
  color,
  loadUsername,
  children,
}: React.PropsWithChildren<{
  userId: string;
  color?: string;
  loadUsername?: boolean;
}>) {
  const [loadedUsername, setLoadedUsername] = React.useState<null | string>(
    null
  );

  React.useEffect(
    () =>
      !loadedUsername &&
      loadUsername &&
      (UserStore.getUser(userId)
        ? setLoadedUsername(UserStore.getUser(userId).username)
        : fetchProfile(userId).then((x) => setLoadedUsername(x.user.username))),
    [loadUsername]
  );

  const styles = stylesheet.createThemedStyleSheet({
    text: {
      color: color ?? "TEXT_NORMAL",
    },
  });

  return (
    <Text
      style={[TextStyleSheet["text-md/bold"], styles.text]}
      onPress={() =>
        UserStore.getUser(userId)
          ? showUserProfile({ userId })
          : fetchProfile(userId).then(() => showUserProfile({ userId }))
      }
    >
      {loadUsername ? `@${loadedUsername ?? "..."}` : children}
    </Text>
  );
}
