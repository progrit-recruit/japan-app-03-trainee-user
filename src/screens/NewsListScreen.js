import React, { useState } from 'react';
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
import { newsData } from '../data/mockData';

const FILTERS = [
  { key: 'all', labelKey: 'all' },
  { key: 'law', labelKey: 'category_law' },
  { key: 'important', labelKey: 'category_important' },
  { key: 'notice', labelKey: 'category_notice' },
];

function getImpactDot(impact) {
  switch (impact) {
    case 'high': return '🔴';
    case 'medium': return '🟡';
    case 'low': return '🟢';
    default: return '⚪';
  }
}

function getImpactColor(impact) {
  switch (impact) {
    case 'high': return colors.danger;
    case 'medium': return '#D97706';
    case 'low': return colors.secondary;
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

function getCategoryColor(category) {
  switch (category) {
    case 'law': return colors.primary;
    case 'important': return colors.danger;
    case 'notice': return colors.secondary;
    default: return colors.textLight;
  }
}

function isNewArticle(dateStr) {
  const articleDate = new Date(dateStr);
  const now = new Date();
  const diffMs = now - articleDate;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
}

export default function NewsListScreen({ lang, navigate }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredNews = activeFilter === 'all'
    ? newsData
    : newsData.filter((n) => n.category === activeFilter);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="newspaper" size={22} color="#FFFFFF" />
        <Text style={styles.headerTitle}>{t(lang, 'news')}</Text>
      </View>

      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[styles.filterButton, activeFilter === filter.key && styles.filterButtonActive]}
              onPress={() => setActiveFilter(filter.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, activeFilter === filter.key && styles.filterTextActive]}>
                {t(lang, filter.labelKey)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {filteredNews.map((news) => (
          <TouchableOpacity
            key={news.id}
            style={styles.card}
            onPress={() => navigate('newsDetail', news)}
            activeOpacity={0.7}
          >
            <View style={styles.cardTop}>
              <View style={styles.cardMeta}>
                <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(news.category) + '20' }]}>
                  <Text style={[styles.categoryText, { color: getCategoryColor(news.category) }]}>
                    {getCategoryLabel(lang, news.category)}
                  </Text>
                </View>
                {isNewArticle(news.date) && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>{t(lang, 'new_badge')}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.impactDot}>{getImpactDot(news.impact)}</Text>
            </View>

            <Text style={styles.cardTitle} numberOfLines={2}>
              {news.title[lang] || news.title.ja}
            </Text>
            <Text style={styles.cardSummary} numberOfLines={2}>
              {news.summary[lang] || news.summary.ja}
            </Text>

            <View style={styles.cardFooter}>
              <Text style={styles.cardDate}>{news.date}</Text>
              <View style={styles.cardFooterRight}>
                <Text style={[styles.impactLabel, { color: getImpactColor(news.impact) }]}>
                  {t(lang, `${news.impact}_impact`)}
                </Text>
                <Ionicons name="chevron-forward" size={16} color={colors.textLight} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: spacing.xl }} />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  filterBar: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  list: {
    flex: 1,
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  categoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  categoryText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  newBadge: {
    backgroundColor: colors.danger,
    borderRadius: radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  impactDot: {
    fontSize: 14,
  },
  cardTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  cardSummary: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDate: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },
  cardFooterRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  impactLabel: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
});
