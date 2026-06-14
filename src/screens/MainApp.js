import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '../theme';
import { t } from '../i18n';

import HomeScreen from './HomeScreen';
import NewsListScreen from './NewsListScreen';
import NewsDetailScreen from './NewsDetailScreen';
import CultureGuideScreen from './CultureGuideScreen';
import CultureDetailScreen from './CultureDetailScreen';
import RightsScreen from './RightsScreen';

const TABS = [
  { key: 'home', icon: 'home', labelKey: 'home' },
  { key: 'news', icon: 'newspaper', labelKey: 'news' },
  { key: 'culture', icon: 'book', labelKey: 'culture_guide' },
  { key: 'rights', icon: 'shield-checkmark', labelKey: 'rights' },
];

export default function MainApp({ lang }) {
  const [currentTab, setCurrentTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState(null);
  const [screenParams, setScreenParams] = useState(null);

  const navigate = (screen, params) => {
    setCurrentScreen(screen);
    setScreenParams(params);
  };

  const goBack = () => {
    setCurrentScreen(null);
    setScreenParams(null);
  };

  const handleTabPress = (tabKey) => {
    setCurrentTab(tabKey);
    setCurrentScreen(null);
    setScreenParams(null);
  };

  const renderScreen = () => {
    if (currentScreen === 'newsDetail') {
      return (
        <NewsDetailScreen
          lang={lang}
          news={screenParams}
          goBack={goBack}
        />
      );
    }
    if (currentScreen === 'cultureDetail') {
      return (
        <CultureDetailScreen
          lang={lang}
          tip={screenParams}
          goBack={goBack}
        />
      );
    }

    switch (currentTab) {
      case 'home':
        return <HomeScreen lang={lang} navigate={navigate} />;
      case 'news':
        return <NewsListScreen lang={lang} navigate={navigate} />;
      case 'culture':
        return <CultureGuideScreen lang={lang} navigate={navigate} />;
      case 'rights':
        return <RightsScreen lang={lang} />;
      default:
        return <HomeScreen lang={lang} navigate={navigate} />;
    }
  };

  const isDetailScreen = currentScreen === 'newsDetail' || currentScreen === 'cultureDetail';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      {!isDetailScreen && (
        <View style={styles.tabBar}>
          {TABS.map((tab) => {
            const isActive = currentTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.tabItem}
                onPress={() => handleTabPress(tab.key)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={isActive ? tab.icon : `${tab.icon}-outline`}
                  size={24}
                  color={isActive ? colors.primary : colors.textLight}
                />
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {t(lang, tab.labelKey)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: Platform.OS === 'ios' ? 0 : 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    marginTop: 2,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});
