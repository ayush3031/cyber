import { IconCircleDotted, IconFileCode, IconFlame, IconReceiptOff } from '@tabler/icons-react';
import { Button, Grid, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import classes from '../styles/Response.module.css'



export function Response({data}) {
    const features = [
    {
        icon: IconReceiptOff,
      title: "Suspicion Level",
      description: data.suspicion_level,
    },
    {
        icon: IconFileCode,
      title: "Reason of Suspicion",
      description: data.reason_of_suspicion,
    },
    {
        icon: IconCircleDotted,
      title: "Red Flags",
      description: data.red_flags.join(", "), // join array into string
    },
    {
        icon: IconFlame,
      title: "Recommended Action",
      description: data.recommended_action,
    },
  ];
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
      >
        <feature.icon size={26} stroke={1.5} />
      </ThemeIcon>
      <Text size="lg" mt="sm" weight={500}>
        {feature.title}
      </Text>
      <Text color="dimmed" size="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className='response-container'>
        <div className={classes.wrapper}>
            <Grid gutter={80}>
                <Grid.Col span={12} md={5}>
                <Title className={classes.title} order={2}>
                    Email Report
                </Title>
                <hr></hr>
                </Grid.Col>
                <Grid.Col span={12} md={7}>
                <SimpleGrid cols={2} spacing={30} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                    {items}
                </SimpleGrid>
                </Grid.Col>
            </Grid>
        </div>
    </div>
    
  );
}
