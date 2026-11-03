import { useState } from 'react';
import { Modal, Pressable, ScrollView, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './Text';
import { Button } from './Button';
import { SelectionPill } from './SelectionPill';
import { SegmentedToggle } from './SegmentedToggle';
import { interestCategories } from '@/data';
import { radius, useTheme } from '@/theme';

/** The New Post composer, opened from the floating + on the feed. */
export function NewPostSheet({
  visible,
  onClose,
  onPost,
}: {
  visible: boolean;
  onClose: () => void;
  onPost: (data: { caption: string; tags: string[]; audience: 'tribe' | 'everyone' }) => void;
}) {
  const theme = useTheme();
  const c = theme.colors;
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [audience, setAudience] = useState<'tribe' | 'everyone'>('tribe');

  const toggleTag = (id: string) =>
    setTags((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const submit = () => {
    onPost({ caption, tags, audience });
    setCaption('');
    setTags([]);
    setAudience('tribe');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: `${c.surfaceInverse}CC`, justifyContent: 'flex-end' }}>
        <Pressable style={{ flex: 1 }} onPress={onClose} accessibilityLabel="Close" />
        <View
          style={{
            maxHeight: '90%',
            backgroundColor: c.background,
            borderTopLeftRadius: radius.xl,
            borderTopRightRadius: radius.xl,
            borderWidth: 1,
            borderColor: c.border,
          }}
        >
          <View style={{ alignItems: 'center', paddingVertical: theme.spacing.sm }}>
            <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: c.border }} />
          </View>
          <ScrollView
            contentContainerStyle={{ padding: theme.spacing.xl, paddingTop: theme.spacing.sm, gap: theme.spacing.lg }}
            showsVerticalScrollIndicator={false}
          >
            <Text variant="h1">New post</Text>

            <View
              style={{
                height: 150,
                borderRadius: radius.lg,
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: c.border,
                backgroundColor: c.surface,
                alignItems: 'center',
                justifyContent: 'center',
                gap: theme.spacing.xs,
              }}
            >
              <Ionicons name="camera-outline" size={28} color={c.accent} />
              <Text variant="small" color={c.textMuted}>
                Add a photo or video
              </Text>
            </View>

            <TextInput
              value={caption}
              onChangeText={setCaption}
              placeholder="Write a caption…"
              placeholderTextColor={c.textMuted}
              multiline
              style={{
                minHeight: 72,
                borderRadius: radius.md,
                borderWidth: 1,
                borderColor: c.border,
                backgroundColor: c.surface,
                padding: theme.spacing.md,
                color: c.text,
                fontFamily: theme.fonts.body,
                fontSize: 15,
                textAlignVertical: 'top',
              }}
            />

            <View style={{ gap: theme.spacing.sm }}>
              <Text variant="label" color={c.textMuted}>
                Tag the interest
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm }}>
                {interestCategories.map((cat) => (
                  <SelectionPill
                    key={cat.id}
                    label={cat.label}
                    selected={tags.includes(cat.id)}
                    onPress={() => toggleTag(cat.id)}
                  />
                ))}
              </View>
            </View>

            <View style={{ gap: theme.spacing.sm }}>
              <Text variant="label" color={c.textMuted}>
                Who can see it
              </Text>
              <SegmentedToggle
                options={[
                  { key: 'tribe', label: 'My tribe' },
                  { key: 'everyone', label: 'Everyone' },
                ]}
                value={audience}
                onChange={setAudience}
              />
              <Text variant="small" color={c.textMuted}>
                {audience === 'tribe'
                  ? 'Only your tribe sees this in their feed.'
                  : 'Everyone on Tribe Connect can see this.'}
              </Text>
            </View>

            <Button label="Post" onPress={submit} />
            <Button label="Cancel" variant="ghost" onPress={onClose} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
