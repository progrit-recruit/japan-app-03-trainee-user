import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, radius } from '../theme';
import { t } from '../i18n';

export default function CultureDetailScreen({ lang, tip, goBack }) {
  if (!tip) return null;

  const title = tip.title[lang] || tip.title.ja;
  const desc = tip.desc[lang] || tip.desc.ja;
  const dos = tip.dos[lang] || tip.dos.ja;
  const donts = tip.donts[lang] || tip.donts.ja;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          <Text style={styles.backText}>{t(lang, 'back')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.emoji}>{tip.emoji}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.descSection}>
          <Text style={styles.descText}>{desc}</Text>
        </View>

        <View style={styles.dosSection}>
          <View style={styles.listHeader}>
            <Text style={styles.checkIcon}>✅</Text>
            <Text style={[styles.listTitle, { color: colors.secondary }]}>
              {t(lang, 'dos')}
            </Text>
          </View>
          {dos.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <View style={[styles.listDot, { backgroundColor: colors.secondary }]} />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.dontsSection}>
          <View style={styles.listHeader}>
            <Text style={styles.checkIcon}>❌</Text>
            <Text style={[styles.listTitle, { color: colors.danger }]}>
              {t(lang, 'donts')}
            </Text>
          </View>
          {donts.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <View style={[styles.listDot, { backgroundColor: colors.danger }]} />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: spacing.xl * 2 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: fontSize.md,
    fontWeight: '500',
  },
  scroll: {
    flex: 1,
  },
  titleSection: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  emoji: {
    fontSize: 56,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 30,
  },
  descSection: {
    backgroundColor: colors.card,
    padding: spacing.md,
    marginTop: spacing.md,
    marginHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  descText: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 26,
  },
  dosSection: {
    backgroundColor: '#F0FDF4',
    padding: spacing.md,
    marginTop: spacing.md,
    marginHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  dontsSection: {
    backgroundColor: '#FEF2F2',
    padding: spacing.md,
    marginTop: spacing.md,
    marginHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  checkIcon: {
    fontSize: 18,
  },
  listTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  listDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 7,
    flexShrink: 0,
  },
  listText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 22,
  },
});
