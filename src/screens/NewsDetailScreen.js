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

function getImpactColor(impact) {
  switch (impact) {
    case 'high': return colors.danger;
    case 'medium': return '#D97706';
    case 'low': return colors.secondary;
    default: return colors.textLight;
  }
}

function getImpactDot(impact) {
  switch (impact) {
    case 'high': return '🔴';
    case 'medium': return '🟡';
    case 'low': return '🟢';
    default: return '⚪';
  }
}

function getCategoryColor(category) {
  switch (category) {
    case 'law': return colors.primary;
    case 'important': return colors.danger;
    case 'notice': return colors.secondary;
    default: return colors.textLight;
  }
}

function getCategoryLabel(lang, category) {
  switch (category) {
    case 'law': return t(lang, 'category_law');
    case 'important': return t(lang, 'category_important');
    case 'notice': return t(lang, 'category_notice');
    default: return category;
  }
}

export default function NewsDetailScreen({ lang, news, goBack }) {
  if (!news) return null;

  const title = news.title[lang] || news.title.ja;
  const body = news.body[lang] || news.body.ja;
  const points = news.points[lang] || news.points.ja;
  const action = news.action ? (news.action[lang] || news.action.ja) : null;
  const impactColor = getImpactColor(news.impact);

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
          <View style={styles.badgeRow}>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(news.category) + '20' }]}>
              <Text style={[styles.categoryText, { color: getCategoryColor(news.category) }]}>
                {getCategoryLabel(lang, news.category)}
              </Text>
            </View>
            <View style={[styles.impactBadge, { backgroundColor: impactColor + '15', borderColor: impactColor }]}>
              <Text style={styles.impactDot}>{getImpactDot(news.impact)}</Text>
              <Text style={[styles.impactText, { color: impactColor }]}>
                {t(lang, `${news.impact}_impact`)}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{news.date}</Text>
        </View>

        <View style={styles.bodySection}>
          <Text style={styles.bodyText}>{body}</Text>
        </View>

        {points && points.length > 0 && (
          <View style={styles.pointsSection}>
            <Text style={styles.pointsTitle}>{t(lang, 'key_points')}</Text>
            {points.map((point, index) => (
              <View key={index} style={styles.pointItem}>
                <View style={styles.pointDot} />
                <Text style={styles.pointText}>{point}</Text>
              </View>
            ))}
          </View>
        )}

        {action && (
          <View style={styles.actionSection}>
            <View style={styles.actionHeader}>
              <Ionicons name="checkmark-circle" size={20} color={colors.secondary} />
              <Text style={styles.actionTitle}>{t(lang, 'action_required')}</Text>
            </View>
            <Text style={styles.actionText}>{action}</Text>
          </View>
        )}

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
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    flexWrap: 'wrap',
  },
  categoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  categoryText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  impactBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
    borderWidth: 1,
    gap: 4,
  },
  impactDot: {
    fontSize: 12,
  },
  impactText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
    lineHeight: 30,
    marginBottom: spacing.sm,
  },
  date: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  bodySection: {
    backgroundColor: colors.card,
    padding: spacing.md,
    marginTop: spacing.md,
    marginHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bodyText: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 26,
  },
  pointsSection: {
    backgroundColor: colors.card,
    padding: spacing.md,
    marginTop: spacing.md,
    marginHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pointsTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  pointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  pointDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 6,
    flexShrink: 0,
  },
  pointText: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 22,
  },
  actionSection: {
    backgroundColor: '#F0FDF4',
    padding: spacing.md,
    marginTop: spacing.md,
    marginHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  actionTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  actionText: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 24,
    fontWeight: '500',
  },
});
