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
import { cultureData } from '../data/mockData';

const CATEGORIES = [
  { key: 'workplace_manners', icon: 'business', color: colors.primary },
  { key: 'job_hunting', icon: 'briefcase', color: '#7C3AED' },
  { key: 'greetings', icon: 'hand-left', color: colors.secondary },
  { key: 'food_life', icon: 'restaurant', color: '#D97706' },
  { key: 'punctuality', icon: 'time', color: colors.danger },
];

export default function CultureGuideScreen({ lang, navigate }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (key) => {
    setExpandedCategory(expandedCategory === key ? null : key);
  };

  const getTipsForCategory = (categoryKey) => {
    return cultureData.filter((tip) => tip.category === categoryKey);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="book" size={22} color="#FFFFFF" />
        <Text style={styles.headerTitle}>{t(lang, 'culture_guide')}</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Text style={styles.introText}>
            {lang === 'ja' && '日本の職場文化・マナーを学びましょう'}
            {lang === 'zh' && '了解日本职场文化和礼仪'}
            {lang === 'vi' && 'Tìm hiểu văn hóa và phép lịch sự tại nơi làm việc Nhật Bản'}
            {lang === 'ko' && '일본 직장 문화와 매너를 배워봅시다'}
            {lang === 'pt' && 'Aprenda sobre a cultura e etiqueta no local de trabalho japonês'}
            {lang === 'ne' && 'जापानी कार्यस्थल संस्कृति र शिष्टाचार सिक्नुहोस्'}
          </Text>
        </View>

        {CATEGORIES.map((cat) => {
          const tips = getTipsForCategory(cat.key);
          const isExpanded = expandedCategory === cat.key;

          return (
            <View key={cat.key} style={styles.categoryBlock}>
              <TouchableOpacity
                style={[styles.categoryHeader, { borderLeftColor: cat.color }]}
                onPress={() => toggleCategory(cat.key)}
                activeOpacity={0.7}
              >
                <View style={[styles.categoryIconBox, { backgroundColor: cat.color + '15' }]}>
                  <Ionicons name={cat.icon} size={22} color={cat.color} />
                </View>
                <View style={styles.categoryTextBox}>
                  <Text style={[styles.categoryTitle, { color: cat.color }]}>
                    {t(lang, cat.key)}
                  </Text>
                  <Text style={styles.categoryCount}>
                    {tips.length}{lang === 'ja' ? '件' : lang === 'zh' ? '条' : lang === 'vi' ? ' mục' : lang === 'ko' ? '개' : lang === 'pt' ? ' itens' : ' वटा'}
                  </Text>
                </View>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.textLight}
                />
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.tipsList}>
                  {tips.map((tip) => (
                    <TouchableOpacity
                      key={tip.id}
                      style={styles.tipItem}
                      onPress={() => navigate('cultureDetail', tip)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.tipEmoji}>{tip.emoji}</Text>
                      <Text style={styles.tipTitle} numberOfLines={2}>
                        {tip.title[lang] || tip.title.ja}
                      </Text>
                      <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        })}

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
  scroll: {
    flex: 1,
  },
  intro: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  introText: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    textAlign: 'center',
  },
  categoryBlock: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderLeftWidth: 4,
    gap: spacing.sm,
  },
  categoryIconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTextBox: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  categoryCount: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    marginTop: 2,
  },
  tipsList: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  tipEmoji: {
    fontSize: 24,
    width: 36,
    textAlign: 'center',
  },
  tipTitle: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 20,
  },
});
