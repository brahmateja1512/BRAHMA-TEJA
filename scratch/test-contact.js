const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://qkghmuutgglslaymehja.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrZ2htdXV0Z2dsc2xheW1laGphIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjI0MDczMiwiZXhwIjoyMDk3ODE2NzMyfQ.F6NfCaiGOgTqsrJJgoLieeA8A3VBT3EthGaK2rHonBo'
);

async function test() {
  const { data, error } = await supabase.from('contact_messages').insert([{
    name: 'Test',
    email: 'test@example.com',
    message: 'Test message',
    subject: 'Test Subject',
    company: 'Test Company',
    phone: '1234567890',
    project_type: 'General Inquiry'
  }]);
  
  if (error) {
    console.error('Insert failed:', error.message);
  } else {
    console.log('Insert succeeded!');
  }
}

test();
