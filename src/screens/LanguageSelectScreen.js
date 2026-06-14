import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { colors, spacing, fontSize, radius } from '../theme';

const languages = [
  { code: 'ja', label: '日本語', flag: '🇯🇵', native: 'にほんご' },
  { code: 'zh', label: '中文', flag: '🇨🇳', native: '中文（简体）' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', native: 'Tiếng Việt' },
  { code: 'ko', label: '한국어', flag: '🇰🇷', native: '한국어' },
  { code: 'pt', label: 'Português', flag: '🇧🇷', native: 'Português (Brasil)' },
  { code: 'ne', label: 'नेपाली', flag: '🇳🇵', native: 'नेपाली' },
];

const selectPrompts = {
  ja: '言語を選択してください',
  zh: '请选择语言',
  vi: 'Vui lòng chọn ngôn ngữ',
  ko: '언어를 선택하세요',
  pt: 'Por favor, selecione um idioma',
  ne: 'कृपया भाषा छान्नुहोस्',
};

export default function LanguageSelectScreen({ onSelect }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.appEmoji}>🏭</Text>
          <Text style={styles.appName}>実習サポート</Text>
          <Text style={styles.appNameSub}>Trainee Support</Text>
        </View>

        <View style={styles.promptContainer}>
          {Object.entries(selectPrompts).map(([lang, text]) => (
            <Text key={lang} style={styles.promptText}>{text}</Text>
          ))}
        </View>

        <View style={styles.langList}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={styles.langButton}
              onPress={() => onSelect(lang.code)}
              activeOpacity={0.7}
            >
              <Text style={styles.langFlag}>{lang.flag}</Text>
              <View style={styles.langTextContainer}>
                <Text style={styles.langLabel}>{lang.label}</Text>
                <Text style={styles.langNative}>{lang.native}</Text>
              </View>
              <Text style={styles.langArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.xl,
    backgroundColor: colors.primary,
  },
  appEmoji: {
    fontSize: 56,
    marginBottom: spacing.sm,
  },
  appName: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  appNameSub: {
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.8)',
    paddingBottom: spacing.lg,
  },
  promptContainer: {
    backgroundColor: colors.card,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  promptText: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
  langList: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  langFlag: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  langTextContainer: {
    flex: 1,
  },
  langLabel: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
  },
  langNative: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginTop: 2,
  },
  langArrow: {
    fontSize: 24,
    color: colors.textLight,
  },
});
