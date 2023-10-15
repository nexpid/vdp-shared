import { findByProps } from "@vendetta/metro";
import { ReactNative as RN, stylesheet } from "@vendetta/metro/common";
import { semanticColors } from "@vendetta/ui";

const { ActionSheetRow } = findByProps("ActionSheetRow");
const { FormRow } = findByProps("FormRow");

export default function RedesignRow({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: number;
  onPress?: () => void;
}) {
  const styles = stylesheet.createThemedStyleSheet({
    iconComponent: {
      width: 24,
      height: 24,
      tintColor: semanticColors.INTERACTIVE_NORMAL,
    },
  });

  return ActionSheetRow ? (
    <ActionSheetRow
      label={label}
      icon={
        <ActionSheetRow.Icon
          source={icon}
          IconComponent={() => (
            <RN.Image
              resizeMode="cover"
              style={styles.iconComponent}
              source={icon}
            />
          )}
        />
      }
      onPress={onPress}
    />
  ) : (
    <FormRow
      label={label}
      leading={<FormRow.Icon source={icon} />}
      onPress={onPress}
    />
  );
}
