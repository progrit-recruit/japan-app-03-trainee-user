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
import { newsData, cultureData } from '../data/mockData';

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

function isNewArticle(dateStr) {
  const articleDate = new Date(dateStr);
  const now = new Date();
  const diffMs = now - articleDate;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
}

export default function HomeScreen({ lang, navigate }) {
  const latestNews = newsData.slice(0, 3);
  const todayTip = cultureData[0];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerBanner}>
        <Text style={styles.headerTitle}>実習サポート</Text>
        <Text style={styles.headerSubtitle}>Trainee Support</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="newspaper" size={20} color={colors.primary} />
          <Text style={styles.sectionTitle}>{t(lang, 'latest_news')}</Text>
        </View>

        {latestNews.map((news) => (
          <TouchableOpacity
            key={news.id}
            style={styles.newsCard}
            onPress={() => navigate('newsDetail', news)}
            activeOpacity={0.7}
          >
            <View style={styles.newsCardTop}>
              <View style={styles.newsMeta}>
                <Text style={styles.newsDate}>{news.date}</Text>
                {isNewArticle(news.date) && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>{t(lang, 'new_badge')}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.impactDot}>{getImpactDot(news.impact)}</Text>
            </View>
            <Text style={styles.newsTitle} numberOfLines={2}>
              {news.title[lang] || news.title.ja}
            </Text>
            <Text style={styles.newsSummary} numberOfLines={2}>
              {news.summary[lang] || news.summary.ja}
            </Text>
            <View style={styles.newsFooter}>
              <Text style={[styles.impactText, { color: getImpactColor(news.impact) }]}>
                {t(lang, `${news.impact}_impact`)}
              </Text>
              <Text style={styles.readMore}>{t(lang, 'read_more')} ›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="bulb" size={20} color={colors.secondary} />
          <Text style={styles.sectionTitle}>{t(lang, 'today_tip')}</Text>
        </View>

        <TouchableOpacity
          style={styles.tipCard}
          onPress={() => navigate('cultureDetail', todayTip)}
          activeOpacity={0.7}
        >
          <Text style={styles.tipEmoji}>{todayTip.emoji}</Text>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>
              {todayTip.title[lang] || todayTip.title.ja}
            </Text>
            <Text style={styles.tipDesc} numberOfLines={3}>
              {todayTip.desc[lang] || todayTip.desc.ja}
            </Text>
            <Text style={styles.readMore}>{t(lang, 'read_more')} ›</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.rightsCard}>
          <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
          <View style={styles.rightsContent}>
            <Text style={styles.rightsTitle}>{t(lang, 'worker_rights')}</Text>
            <Text style={styles.rightsSubtitle}>{t(lang, 'contact_for_problems')}</Text>
          </View>
          <Text style={styles.rightsPhone}>0120-936-566</Text>
        </View>
      </View>

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerBanner: {
    backgroundColor: colors.primary,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  newsCard: {
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
  newsCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  newsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  newsDate: {
    fontSize: fontSize.xs,
    color: colors.textLight,
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
  newsTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  newsSummary: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  impactText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  readMore: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '500',
  },
  tipCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tipEmoji: {
    fontSize: 36,
    marginRight: spacing.md,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  tipDesc: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  rightsCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: radius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  rightsContent: {
    flex: 1,
  },
  rightsTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.primary,
  },
  rightsSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    marginTop: 2,
  },
  rightsPhone: {
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
