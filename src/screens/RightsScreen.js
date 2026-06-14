import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, radius } from '../theme';
import { t } from '../i18n';
import { rightsData } from '../data/mockData';

function SectionCard({ children, style }) {
  return (
    <View style={[styles.sectionCard, style]}>
      {children}
    </View>
  );
}

function SectionHeader({ icon, title, color }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <View style={[styles.sectionIconBox, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={[styles.sectionTitle, { color }]}>{title}</Text>
    </View>
  );
}

function InfoRow({ label, value, highlight }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, highlight && styles.infoValueHighlight]}>{value}</Text>
    </View>
  );
}

export default function RightsScreen({ lang }) {
  const { minimumWage, workingHours, paidLeave, contacts } = rightsData;

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`).catch(() => {});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={22} color="#FFFFFF" />
        <Text style={styles.headerTitle}>{t(lang, 'worker_rights')}</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* 賃金セクション */}
        <View style={styles.section}>
          <SectionCard>
            <SectionHeader
              icon="cash"
              title={t(lang, 'wage_section')}
              color={colors.secondary}
            />
            <View style={styles.highlightBox}>
              <Text style={styles.bigNumber}>{minimumWage.national.toLocaleString()}</Text>
              <Text style={styles.bigNumberUnit}>{t(lang, 'per_hour')}</Text>
            </View>
            <View style={styles.divider} />
            <Text style={styles.subSectionTitle}>
              {lang === 'ja' ? '主要都市の最低賃金' :
               lang === 'zh' ? '主要城市的最低工资' :
               lang === 'vi' ? 'Lương tối thiểu tại các thành phố chính' :
               lang === 'ko' ? '주요 도시 최저임금' :
               lang === 'pt' ? 'Salário mínimo nas principais cidades' :
               'प्रमुख शहरहरूको न्यूनतम ज्याला'}
            </Text>
            {minimumWage.regions.map((region, index) => (
              <InfoRow
                key={index}
                label={region.name[lang] || region.name.ja}
                value={`${region.wage.toLocaleString()} 円/時`}
                highlight={true}
              />
            ))}
          </SectionCard>
        </View>

        {/* 労働時間セクション */}
        <View style={styles.section}>
          <SectionCard>
            <SectionHeader
              icon="time"
              title={t(lang, 'hours_section')}
              color={colors.primary}
            />
            <InfoRow
              label={t(lang, 'working_hours')}
              value={t(lang, 'legal_hours')}
            />
            <View style={styles.divider} />
            <InfoRow
              label={lang === 'ja' ? '残業上限' :
                     lang === 'zh' ? '加班上限' :
                     lang === 'vi' ? 'Giới hạn làm thêm' :
                     lang === 'ko' ? '잔업 상한' :
                     lang === 'pt' ? 'Limite de horas extras' :
                     'ओभरटाइम सीमा'}
              value={t(lang, 'overtime_limit')}
            />
            <View style={styles.warningBox}>
              <Ionicons name="warning" size={16} color="#D97706" />
              <Text style={styles.warningText}>
                {lang === 'ja' ? 'サービス残業（無賃残業）は違法です' :
                 lang === 'zh' ? '无偿加班是违法的' :
                 lang === 'vi' ? 'Làm thêm không lương là bất hợp pháp' :
                 lang === 'ko' ? '무임 잔업은 불법입니다' :
                 lang === 'pt' ? 'Horas extras sem pagamento são ilegais' :
                 'बिना पारिश्रमिक ओभरटाइम गैरकानुनी छ'}
              </Text>
            </View>
          </SectionCard>
        </View>

        {/* 休暇セクション */}
        <View style={styles.section}>
          <SectionCard>
            <SectionHeader
              icon="calendar"
              title={t(lang, 'leave_section')}
              color="#7C3AED"
            />
            <InfoRow
              label={t(lang, 'days_off')}
              value={t(lang, 'paid_leave')}
            />
            <View style={styles.divider} />
            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={16} color={colors.primary} />
              <Text style={styles.infoBoxText}>
                {lang === 'ja' ? '有給休暇を取得させてもらえない場合は違法です。相談窓口に連絡してください。' :
                 lang === 'zh' ? '不允许使用带薪假期是违法的。请联系咨询窗口。' :
                 lang === 'vi' ? 'Không cho nghỉ phép có lương là vi phạm pháp luật. Hãy liên hệ cửa sổ tư vấn.' :
                 lang === 'ko' ? '유급휴가를 사용하지 못하게 하는 것은 불법입니다.' :
                 lang === 'pt' ? 'Não permitir férias remuneradas é ilegal. Entre em contato com o balcão de consulta.' :
                 'पारिश्रमिक सहित बिदा लिन नदिनु गैरकानुनी छ।'}
              </Text>
            </View>
          </SectionCard>
        </View>

        {/* 相談窓口セクション */}
        <View style={styles.section}>
          <SectionCard style={styles.contactCard}>
            <SectionHeader
              icon="call"
              title={t(lang, 'contact_section')}
              color={colors.danger}
            />
            <Text style={styles.contactSubtitle}>
              {t(lang, 'contact_for_problems')}
            </Text>

            {contacts.map((contact, index) => (
              <View key={index} style={styles.contactItem}>
                <Text style={styles.contactName}>
                  {contact.name[lang] || contact.name.ja}
                </Text>
                <TouchableOpacity
                  style={styles.phoneButton}
                  onPress={() => handleCall(contact.phone)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="call" size={22} color="#FFFFFF" />
                  <Text style={styles.phoneNumber}>{contact.phone}</Text>
                  {contact.free && (
                    <View style={styles.freeBadge}>
                      <Text style={styles.freeBadgeText}>
                        {lang === 'ja' ? '無料' :
                         lang === 'zh' ? '免费' :
                         lang === 'vi' ? 'Miễn phí' :
                         lang === 'ko' ? '무료' :
                         lang === 'pt' ? 'Grátis' :
                         'निःशुल्क'}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <Text style={styles.contactHours}>
                  {contact.hours[lang] || contact.hours.ja}
                </Text>
                {index < contacts.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </SectionCard>
        </View>

        {/* 禁止事項カード */}
        <View style={styles.section}>
          <SectionCard>
            <SectionHeader
              icon="close-circle"
              title={lang === 'ja' ? '違法行為について' :
                     lang === 'zh' ? '关于违法行为' :
                     lang === 'vi' ? 'Về hành vi vi phạm pháp luật' :
                     lang === 'ko' ? '불법행위에 대해' :
                     lang === 'pt' ? 'Sobre atos ilegais' :
                     'गैरकानुनी कार्यहरूबारे'}
              color={colors.danger}
            />
            {[
              lang === 'ja' ? 'パスポート・在留カードの取り上げは違法' :
              lang === 'zh' ? '没收护照和居留卡是违法的' :
              lang === 'vi' ? 'Tịch thu hộ chiếu và thẻ cư trú là vi phạm pháp luật' :
              lang === 'ko' ? '여권·재류카드 압수는 불법' :
              lang === 'pt' ? 'Apreensão de passaporte e cartão de residência é ilegal' :
              'राहदानी र बसोबास कार्ड खोस्नु गैरकानुनी',

              lang === 'ja' ? '賃金の不払い・遅延は違法' :
              lang === 'zh' ? '欠薪或延迟支付是违法的' :
              lang === 'vi' ? 'Không trả lương hoặc trả chậm là vi phạm pháp luật' :
              lang === 'ko' ? '임금 미지급·지연은 불법' :
              lang === 'pt' ? 'Não pagar ou atrasar salário é ilegal' :
              'तलब नदिनु वा ढिलाइ गर्नु गैरकानुनी',

              lang === 'ja' ? '強制的な貯金の管理は違法' :
              lang === 'zh' ? '强制管理储蓄是违法的' :
              lang === 'vi' ? 'Quản lý tiết kiệm bắt buộc là vi phạm pháp luật' :
              lang === 'ko' ? '강제 저축 관리는 불법' :
              lang === 'pt' ? 'Gerenciar poupanças forçadas é ilegal' :
              'जबरजस्ती बचत व्यवस्थापन गैरकानुनी',

              lang === 'ja' ? 'ハラスメント・差別は許されない' :
              lang === 'zh' ? '骚扰和歧视是不被允许的' :
              lang === 'vi' ? 'Quấy rối và phân biệt đối xử là không được phép' :
              lang === 'ko' ? '괴롭힘·차별은 허용되지 않는다' :
              lang === 'pt' ? 'Assédio e discriminação não são permitidos' :
              'उत्पीडन र भेदभाव स्वीकार्य छैन',
            ].map((text, index) => (
              <View key={index} style={styles.illegalItem}>
                <Ionicons name="close-circle" size={18} color={colors.danger} />
                <Text style={styles.illegalText}>{text}</Text>
              </View>
            ))}
          </SectionCard>
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
  section: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  sectionCard: {
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
  contactCard: {
    borderColor: '#FECACA',
    borderWidth: 1.5,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  sectionIconBox: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },
  highlightBox: {
    backgroundColor: '#F0FDF4',
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  bigNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  bigNumberUnit: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  subSectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  infoLabel: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    flex: 1,
  },
  infoValue: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  infoValueHighlight: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: fontSize.md,
  },
  warningBox: {
    backgroundColor: '#FFFBEB',
    borderRadius: radius.sm,
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginTop: spacing.sm,
  },
  warningText: {
    fontSize: fontSize.sm,
    color: '#92400E',
    flex: 1,
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: radius.sm,
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginTop: spacing.sm,
  },
  infoBoxText: {
    fontSize: fontSize.sm,
    color: '#1E40AF',
    flex: 1,
    lineHeight: 20,
  },
  contactSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginBottom: spacing.md,
  },
  contactItem: {
    marginBottom: spacing.sm,
  },
  contactName: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  phoneButton: {
    backgroundColor: colors.danger,
    borderRadius: radius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  phoneNumber: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  freeBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  freeBadgeText: {
    color: '#FFFFFF',
    fontSize: fontSize.xs,
    fontWeight: 'bold',
  },
  contactHours: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    textAlign: 'center',
  },
  illegalItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  illegalText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 22,
  },
});
