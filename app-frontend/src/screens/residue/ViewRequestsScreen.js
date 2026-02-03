import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { commonStyles } from '../../styles/commonStyles';

const ViewRequestsScreen = () => {
    const [requests] = useState([
        {
            id: '1',
            cropDetail: 'Wheat stubble',
            quantity: '5',
            date: '15/02/2024',
            location: 'Village Rampur, District Meerut',
            status: 'Pending',
        },
        {
            id: '2',
            cropDetail: 'Rice straw',
            quantity: '3',
            date: '10/02/2024',
            location: 'Village Rampur, District Meerut',
            status: 'Completed',
        },
        {
            id: '3',
            cropDetail: 'Cotton stalks',
            quantity: '4',
            date: '05/02/2024',
            location: 'Village Rampur, District Meerut',
            status: 'Completed',
        },
    ]);

    const RequestCard = ({ item }) => {
        const isPending = item.status === 'Pending';
        return (
            <View style={commonStyles.card}>
                <View style={styles.requestHeader}>
                    <View style={styles.requestInfo}>
                        <Text style={styles.cropDetail}>{item.cropDetail}</Text>
                        <Text style={styles.quantity}>{item.quantity} tons</Text>
                    </View>
                    <View style={[
                        styles.statusBadge,
                        { backgroundColor: isPending ? colors.warning + '20' : colors.success + '20' }
                    ]}>
                        <Text style={[
                            styles.statusText,
                            { color: isPending ? colors.warning : colors.success }
                        ]}>
                            {item.status}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <MaterialIcons name="calendar-today" size={16} color={colors.textSecondary} />
                    <Text style={styles.detailText}>Pickup Date: {item.date}</Text>
                </View>

                <View style={styles.detailRow}>
                    <MaterialIcons name="location-on" size={16} color={colors.textSecondary} />
                    <Text style={styles.detailText}>{item.location}</Text>
                </View>

                {isPending && (
                    <View style={styles.pendingNote}>
                        <MaterialIcons name="info" size={16} color={colors.info} />
                        <Text style={styles.pendingText}>
                            Our team will contact you within 24 hours
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    const pendingCount = requests.filter(r => r.status === 'Pending').length;
    const completedCount = requests.filter(r => r.status === 'Completed').length;

    return (
        <View style={commonStyles.container}>
            {/* Summary Cards */}
            <View style={styles.summaryContainer}>
                <View style={[styles.summaryCard, { backgroundColor: colors.warning + '20' }]}>
                    <Text style={styles.summaryNumber}>{pendingCount}</Text>
                    <Text style={styles.summaryLabel}>Pending</Text>
                </View>
                <View style={[styles.summaryCard, { backgroundColor: colors.success + '20' }]}>
                    <Text style={styles.summaryNumber}>{completedCount}</Text>
                    <Text style={styles.summaryLabel}>Completed</Text>
                </View>
            </View>

            {/* Requests List */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>All Requests</Text>
                {requests.map((item) => (
                    <RequestCard key={item.id} item={item} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    summaryContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    summaryCard: {
        flex: 1,
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    summaryNumber: {
        fontSize: 32,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: 4,
    },
    summaryLabel: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    content: {
        padding: 16,
        paddingTop: 0,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: 12,
    },
    requestHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    requestInfo: {
        flex: 1,
    },
    cropDetail: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 4,
    },
    quantity: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailText: {
        fontSize: 14,
        color: colors.textSecondary,
        marginLeft: 8,
        flex: 1,
    },
    pendingNote: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.info + '10',
        padding: 10,
        borderRadius: 8,
        marginTop: 8,
    },
    pendingText: {
        fontSize: 12,
        color: colors.info,
        marginLeft: 8,
        flex: 1,
    },
});

export default ViewRequestsScreen;
