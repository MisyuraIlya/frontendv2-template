import { Grid, Box, Typography } from '@mui/material';
import CronJobCard from './Card';  
import { AdminCronManager } from '../../services/admin/AdminCronManager.service';

type CronJobConfig = {
  id: number;
  name: string;
  displayName: string;
  fetcher: () => Promise<IResponse<{}>>;
  statusFetcher: () => Promise<{ isSyncing: boolean }>;
};

const cronJobs: CronJobConfig[] = [
  {
    id: 1,
    name: 'agents',
    displayName: 'Agents',
    fetcher: AdminCronManager.getAgents,
    statusFetcher: AdminCronManager.getAgentStatus,
  },
  {
    id: 2,
    name: 'users',
    displayName: 'Users',
    fetcher: AdminCronManager.getUsers,
    statusFetcher: AdminCronManager.getUsersStatus,
  },
  {
    id: 3,
    name: 'category',
    displayName: 'Categories',
    fetcher: AdminCronManager.getCategories,
    statusFetcher: AdminCronManager.getCategoryStatus,
  },
  {
    id: 4,
    name: 'products',
    displayName: 'Products',
    fetcher: AdminCronManager.getProducts,
    statusFetcher: AdminCronManager.getProductsStatus,
  },
  {
    id: 5,
    name: 'price-lists',
    displayName: 'Price Lists',
    fetcher: AdminCronManager.getPriceLists,
    statusFetcher: AdminCronManager.getPriceListsStatus,
  },
  {
    id: 6,
    name: 'price-list-detailed',
    displayName: 'Detailed Price Lists',
    fetcher: AdminCronManager.getPriceListDetailed,
    statusFetcher: AdminCronManager.getPriceListDetailedStatus,
  },
  {
    id: 7,
    name: 'price-list-user',
    displayName: 'User Price Lists',
    fetcher: AdminCronManager.getPriceListUser,
    statusFetcher: AdminCronManager.getPriceListUserStatus,
  },
  {
    id: 8,
    name: 'attributes-main',
    displayName: 'Main Attributes',
    fetcher: AdminCronManager.getAttributesMain,
    statusFetcher: AdminCronManager.getAttributesMainStatus,
  },
  {
    id: 9,
    name: 'attributes-sub',
    displayName: 'Sub Attributes',
    fetcher: AdminCronManager.getAttributesSub,
    statusFetcher: AdminCronManager.getAttributesSubStatus,
  },
  {
    id: 10,
    name: 'attributes-product',
    displayName: 'Product Attributes',
    fetcher: AdminCronManager.getAttributesProduct,
    statusFetcher: AdminCronManager.getAttributesProductStatus,
  },
];

const List = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>
      Cron Manager
    </Typography>
    <Grid container spacing={2}>
      {cronJobs.map((job) => (
        <Grid size={{xs:12,md:6}} key={job.id}>
          <CronJobCard
            displayName={job.displayName}
            fetcher={job.fetcher}
            statusFetcher={job.statusFetcher}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default List;
